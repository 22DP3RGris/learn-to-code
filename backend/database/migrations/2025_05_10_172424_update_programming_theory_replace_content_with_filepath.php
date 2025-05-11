<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('programming_theory', function (Blueprint $table) {
            $table->dropColumn('content');
            $table->string('filepath')->after('title');
        });
    }

    public function down()
    {
        Schema::table('programming_theory', function (Blueprint $table) {
            $table->dropColumn('filepath');
            $table->text('content')->after('title');
        });
    }
};
