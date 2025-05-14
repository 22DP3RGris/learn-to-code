<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('theory_change_requests', function (Blueprint $table) {
            $table->unsignedBigInteger('theory_id')->nullable(); 

            $table->foreign('theory_id')->references('id')->on('programming_theory')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('theory_change_requests', function (Blueprint $table) {
            $table->dropForeign(['theory_id']);
            $table->dropColumn('theory_id');
        });
    }

};
