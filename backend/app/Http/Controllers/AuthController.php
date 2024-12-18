<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\RefreshTokenRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\Http\Controllers\AccessTokenController;

class AuthController extends AccessTokenController
{
    public function refreshToken(RefreshTokenRequest $request): JsonResponse
    {
        try {
            $response = Http::asForm()->post(env('APP_URL') . '/oauth/token', [
                'grant_type' => 'refresh_token',
                'refresh_token' => $request->refresh_token,
                'client_id' => env('PASSPORT_PASSWORD_CLIENT_ID'),
                'client_secret' => env('PASSPORT_PASSWORD_SECRET'),
                'scope' => '',
            ]);

            if ($response->status() === 401) {
                return response()->json(['message' => 'Invalid refresh token'], 401);
            }

            return response()->json([
                'success' => true,
                'statusCode' => 200,
                'message' => 'Refreshed token.',
                'data' => $response->json(),
            ], 200);

        } catch (\Throwable $th) {
            return response()->json(['message' => 'Could not reissue new refresh token'], 500);
        }
    }

    public function register(RegisterRequest $request) {
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            return response()->json(['message' => 'User registred succesfully', 'user' => $user], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Could not register user, please try again later'], 500);
        }
    }

    public function login(LoginRequest $request) {
        try {
            $credentials = $request->only('email', 'password');

            $checkUser = Auth::attempt($credentials);

            if ($checkUser) {
                $user = Auth::user();

                $response = Http::post(env('APP_URL') . '/oauth/token', [
                    'grant_type' => 'password',
                    'client_id' => env('PASSPORT_PASSWORD_CLIENT_ID'),
                    'client_secret' => env('PASSPORT_PASSWORD_SECRET'),
                    'username' => $request->email,
                    'password' => $request->password,
                    'scope' => '',
                ]);
    
                $token = $response->json();

                return response()->json(['message' => 'User logged in succesfully', 'user' => $user, 'token' => $token], 201);
            } else {
                return response()->json(['message' => 'User is not authorized'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => 'There was an error while trying to log user in'], 500);
        }
    }
    

    public function logout() {
        try {
            $userAccessToken = Auth::user()->token();
            $userAccessToken->revoke();

            DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $userAccessToken->id)
            ->update(['revoked' => true]);

            return response()->json(['message' => 'User logged out succesfully'], 200);

        } catch (\Throwable $th) {
            return response()->json(['message' => 'There was an error while uploading logging user out'], 500);

        }
    }
}