<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function update(UpdateProfileRequest $request)
    {
        $user = $request->user();

        $data = $request->validated();

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return response()->json(['user' => $user]);
    }

    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $users = User::all();
        return response()->json($users);
    }

    public function updateUser(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user = User::findOrFail($id);

        $rules = [];

        if ($request->has('username')) {
            $rules['username'] = ['required', 'string', 'max:55', 'regex:/^(?=.*[A-Za-z])[A-Za-z0-9\s]+$/'];
        }
        if ($request->has('email')) {
            $rules['email'] = 'required|email|unique:users,email,' . $id;
        }
        if ($request->has('phone')) {
            $rules['phone'] = 'required|nullable|string|max:20';
        }
        if ($request->has('role')) {
            $rules['role'] = 'required|string';
        }
        if ($request->has('rating')) {
            $rules['rating'] = 'required|nullable|numeric|between:0.00,999999.99';
        }

        $validated = $request->validate($rules);

        $user->update($validated);

        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function filter(Request $request)
    {
        $query = User::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('username', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%");
            });
        }

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        if ($request->filled('created_on')) {
            $query->whereDate('created_at', $request->created_on);
        }

        $sortBy = $request->get('sortBy', 'username');
        $sortOrder = $request->get('sortOrder', 'asc');
        $allowedSortFields = ['username', 'email', 'phone', 'role', 'rating', 'created_at'];

        if (!in_array($sortBy, $allowedSortFields)) {
            $sortBy = 'username';
        }

        $query->orderBy($sortBy, $sortOrder);

        $averageRating = (clone $query)->avg('rating');
        $users = $query->get();

        return response()->json([
            'users' => $users,
            'average_rating' => round($averageRating, 2),
            'count' => $users->count(),
        ]);
    }

    public function roleStatistics(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $stats = User::select('role', \DB::raw('count(*) as total'))
            ->groupBy('role')
            ->get();

        return response()->json($stats);
    }
}
