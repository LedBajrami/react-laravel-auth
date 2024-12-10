<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(PostRequest $request, $postId) {
        $comment = Comment::create([
            'post_id' => $postId,
            'user_id' => Auth::id(),
            'content' => $request->content,
        ]);

        return response()->json(['message' => 'Comment added successfully', 'comment' => $comment], 201);
    }


    public function delete($id) {
        $comment = Comment::find($id);

        if (!$comment || $comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized or comment not found'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully'], 200);
    }
}