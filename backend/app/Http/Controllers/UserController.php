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
    public function user() {
        try {
            $user = Auth::user(); 
    
                $userData = [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'profile_photo' => $user->profile_photo
                ];
    
                return response()->json([
                    'message' => 'User data retrieved successfully',
                    'user' => $userData,
                ], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'There was an error while retrieving user data'], 500);
        }
    }



    public function uploadPhoto(UploadProfilePhotoRequest $request) {
        try {
            $user = Auth::user();

                $file = $request->file('profile_photo');
                $path = $file->store('profile_photos', 'public');
                $profile_photo = Storage::url($path);
                $user->profile_photo = $profile_photo;
                $user->save();

                return response()->json(['message' => 'Profile Photo uploaded succesfully', 'profile_photo' => $profile_photo], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'There was an error while uploading the profile photo'], 500);
        }
       
    }
}