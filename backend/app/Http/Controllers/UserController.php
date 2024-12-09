<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Models\User;

class Useontroller extends Controller
{
    public function register(RegisterRequest $request) {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json(['message' => 'User registred succesfully', 'user' => $user], 201);
    }

    public function login(LoginRequest $request) {
        $credentials = $request->only('email', 'password');

        $checkUser = Auth::attempt($credentials);

        if ($checkUser) {
            $user = Auth::user();
            $token = $user->createToken('access_token')->accessToken;

            return response()->json(['message' => 'User logged in succesfully', 'user' => $user, 'token' => $token], 201);
        } else {
            return response()->json(['message' => 'User is not authorized'], 401);
        }
    }


    public function user() {
        $user = Auth::user(); 
    
        if ($user) {
           
            $userData = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_photo' => $user->profile_photo
            ];
    
            return response()->json(['message' => 'User data retrieved successfully', 'user' => $userData], 200);
        } else {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
    }
}