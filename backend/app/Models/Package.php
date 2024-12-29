<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_name', 'content', 'price'
    ];

    protected $primaryKey = 'package_id'; // Specify the primary key
    public $incrementing = false;         // If it's not auto-incrementing, set this to false
    protected $keyType = 'string';        // Adjust if the primary key is not an integer (e.g., UUIDs)

    public function codes()
    {
        return $this->hasMany(Code::class, 'package_id');
    }
}
    