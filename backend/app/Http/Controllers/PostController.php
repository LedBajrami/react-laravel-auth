<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function create(PostRequest $request) {
        try {
            $post = Post::create([
                'user_id' => Auth::id(),
                'content' => $request->content,
            ]);
    
            return response()->json(['message' => 'Post created successfully', 'post' => $post], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Could not create post, please try again later'], 500);
        }
    }

    public function posts() {
        try {
            $posts = Post::where('user_id', Auth::id())->latest()->get();
            return response()->json(['posts' => $posts], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Could not get posts data, please try again later'], 500);
        }
    }

    public function delete($id) {
        try {
            $post = Post::find($id);

            if ($post && $post->user_id == Auth::id()) {
                $post->delete();
                return response()->json(['message' => 'Post deleted successfully'], 200);
            } else {
                return response()->json(['message' => 'Post not found or unauthorized'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Could not delete post, please try again later'], 500);
        }
    }


    public function show($id) {
        try {
            $post = Post::with('comments.user')->find($id);

            if (!$post) {
                return response()->json(['message' => 'Post not found'], 404);
            }

            return response()->json(['post' => $post], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Could not retrieve post with comments data please try again later'], 500);
        }
    }
}
