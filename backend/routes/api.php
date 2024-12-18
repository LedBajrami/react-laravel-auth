<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::middleware(['throttle:authActions'])->group(function () {
  Route::post('/register', [UserController::class, 'register']);
  Route::post('/login', [UserController::class, 'login']);
  Route::post('/refresh', [AuthController::class, 'refreshToken'])->middleware('throttle:authActions');
});

Route::middleware(['auth:api'])->group(function() {

  Route::get('/user', [UserController::class, 'user']);
  Route::post('/user/upload', [UserController::class, 'uploadPhoto'])->middleware('throttle:createActions');
  Route::get('/logout', [UserController::class, 'logout'])->middleware('throttle:authActions');


  Route::post('/post', [PostController::class, 'create'])->middleware('throttle:createActions');
  Route::get('/posts', [PostController::class, 'index']);
  Route::delete('/posts/{id}', [PostController::class, 'delete'])->middleware('throttle:deleteActions'); 


  Route::get('/posts/{id}', [PostController::class, 'show']);
  Route::post('/posts/{postId}/comments', [CommentController::class, 'store'])->middleware('throttle:createActions');
  Route::delete('/comments/{id}', [CommentController::class, 'delete'])->middleware('throttle:deleteActions');

});
