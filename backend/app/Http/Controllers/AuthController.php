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
    public function refreshToken() {
        try {
            $refreshToken = request()->cookie('refresh_token');

            if (!$refreshToken) {
                return response()->json(['message' => 'No refresh token found'], 401);
            }

            $response = Http::asForm()->post(env('APP_URL') . '/oauth/token', [
                'grant_type' => 'refresh_token',
                'refresh_token' => $refreshToken,
                'client_id' => env('PASSPORT_PASSWORD_CLIENT_ID'),
                'client_secret' => env('PASSPORT_PASSWORD_SECRET'),
                'scope' => '',
            ]);

            if ($response->status() === 401) {
                return response()->json(['message' => 'Invalid refresh token'], 401);
            }

            if ($response->ok()) {
                $token = $response->json();

                return response()->json([
                    'success' => true,
                    'statusCode' => 200,
                    'message' => 'Refreshed token.',
                    'access_token' => $token['access_token'],
                ], 200)
                ->cookie(
                    'refresh_token',
                    $token['refresh_token'],
                    60 * 24 * 30,
                    '/',
                    '127.0.0.1',
                    false,
                    true,
                    false,
                    'Lax'
                );
            }

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
                $response = Http::post(env('APP_URL') . '/oauth/token', [
                    'grant_type' => 'password',
                    'client_id' => env('PASSPORT_PASSWORD_CLIENT_ID'),
                    'client_secret' => env('PASSPORT_PASSWORD_SECRET'),
                    'username' => $request->email,
                    'password' => $request->password,
                    'scope' => '',
                ]);

                if($response->ok()) {
                    $token = $response->json();
                    return response()->json([
                         'message' => 'User logged in successfully',
                         'access_token' => $token['access_token']
                    ], 201)
                    ->cookie(
                        'refresh_token',
                        $token['refresh_token'],
                        60 * 24 * 30,
                        '/',
                        '127.0.0.1',
                        false,
                        true,
                        false,
                        'Lax'
                    );
                }
                return response()->json(['message' => 'User is not authorized'], 401);
        
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

            return response()->json(['message' => 'User logged out succesfully'], 200)
            ->cookie('refresh_token', '', -1);

        } catch (\Throwable $th) {
            return response()->json(['message' => 'There was an error while uploading logging user out'], 500);

        }
    }
}