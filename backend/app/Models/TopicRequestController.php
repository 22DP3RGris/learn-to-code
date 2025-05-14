<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TopicRequestController extends Model
{
    protected $table = 'topic_change_requests'; 

    protected $fillable = [
        'language_id', 
        'user_id', 
        'title', 
        'description', 
        'status', 
        'difficulty'
    ];
}
