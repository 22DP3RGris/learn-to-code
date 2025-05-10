<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $userId = $this->user()->id;

        $rules = [
            'username' => 'required|string|max:55',
            'email' => 'required|string|email|max:255|unique:users,email,' . $userId,
            'phone' => 'nullable|string|max:15',
            'role' => 'required|in:student,teacher',
        ];

        if ($this->filled('password')) {
            $rules['password'] = 'nullable|string|min:8';
            $rules['password_confirmation'] = 'nullable|string|same:password';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'email.unique' => 'This email is already taken.',
            'password.min' => 'The password must be at least 8 characters.',
            'password_confirmation.same' => 'The password confirmation does not match.',
            'role.in' => 'The role must be one of the following: student, teacher.',
        ];
    }
}
