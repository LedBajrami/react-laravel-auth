<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::group([], function () {
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/refresh', [AuthController::class, 'refreshToken']);
});


Route::middleware(['auth:api'])->group(function() {

    Route::get('/user', [UserController::class, 'user']);
    Route::post('/user/upload', [UserController::class, 'uploadPhoto']);
    Route::get('/logout', [UserController::class, 'logout']);

    Route::post('/post', [PostController::class, 'create']);
    Route::get('/posts', [PostController::class, 'posts']);
    Route::delete('/posts/{id}', [PostController::class, 'delete']); 

    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::post('/posts/{postId}/comments', [CommentController::class, 'store']);
    Route::delete('/comments/{id}', [CommentController::class, 'delete']);
    
});    