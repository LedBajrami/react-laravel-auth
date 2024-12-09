<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\UploadProfilePhotoRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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



    public function uploadPhoto(UploadProfilePhotoRequest $request) {
        $user = Auth::user();

        if ($user) {
            $file = $request->file('profile_photo');
            $path = $file->store('profile_photos', 'public');
            $profile_photo = Storage::url($path);
            $user->profile_photo = $profile_photo;
            $user->save();
            return response()->json(['message' => 'Profile Photo uploaded succesfully', 'profile_photo' => $profile_photo], 200);
        } else {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    }
}