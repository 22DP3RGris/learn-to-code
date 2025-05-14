<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('theory_change_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('theory_id')->constrained('programming_theory');
            $table->text('content'); 
            $table->boolean('is_approved')->default(false); 
            $table->timestamps();
        });
    }

    public function down()
    {
        // Schema::dropIfExists('theory_change_requests');
    }
};
