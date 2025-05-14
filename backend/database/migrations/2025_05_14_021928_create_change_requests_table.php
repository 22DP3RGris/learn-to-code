<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChangeRequestsTable extends Migration
{
    public function up()
    {
        Schema::create('topic_change_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('language_id')->constrained('programming_languages')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->enum('status', ['NEW', 'UPDATE'])->default('NEW');
            $table->enum('difficulty', ['begginer', 'intermediate', 'advanced', 'expert']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('change_requests');
    }

}
