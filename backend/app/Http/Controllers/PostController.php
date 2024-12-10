<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function create(PostRequest $request) {
        $post = Post::create([
            'user_id' => Auth::id(),
            'content' => $request->content,
        ]);

        return response()->json(['message' => 'Post created successfully', 'post' => $post], 201);
    }

    public function posts() {
        $posts = Post::where('user_id', Auth::id())->latest()->get();
        return response()->json(['posts' => $posts], 200);
    }

    public function delete($id) {
        $post = Post::find($id);

        if ($post && $post->user_id == Auth::id()) {
            $post->delete();
            return response()->json(['message' => 'Post deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Post not found or unauthorized'], 404);
        }
    }


    public function show($id) {
        $post = Post::with('comments.user')->find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        return response()->json(['post' => $post], 200);
    }
}
