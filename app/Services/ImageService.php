<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageService
{
    /**
     * Determine which disk to use for image storage.
     * Falls back to 'public' if Supabase credentials are not configured.
     */
    private function getDisk(): string
    {
        // Check if AWS credentials are configured for Supabase
        if (config('filesystems.disks.supabase.key') && config('filesystems.disks.supabase.secret')) {
            return 'supabase';
        }
        
        return 'public';
    }

    public function storeProductImage(UploadedFile $file): string
    {
        return $file->store('products', $this->getDisk()); 
    }

    public function storeLogo(UploadedFile $file, string $path): string
    {
        $disk = $this->getDisk();
        $storedPath = Storage::disk($disk)->putFileAs(dirname($path), $file, basename($path));
        
        // Always return full URL
        return Storage::disk($disk)->url($storedPath);
    }

    public function deleteIfExists(?string $pathOrUrl): void
    {
        if (!$pathOrUrl) {
            return;
        }

        $disk = $this->getDisk();
        
        // Extract path from URL or absolute path
        $path = $pathOrUrl;
        if (str_starts_with($pathOrUrl, 'http')) {
            // Extract path from URL
            $parsedUrl = parse_url($pathOrUrl);
            if (isset($parsedUrl['path'])) {
                $path = $parsedUrl['path'];
            }
        }
        
        // Remove common prefixes
        $path = ltrim($path, '/');
        $path = preg_replace('#^storage/#', '', $path);
        
        if (Storage::disk($disk)->exists($path)) {
            Storage::disk($disk)->delete($path);
        } else {
            \Log::info("Could not find file to delete on disk {$disk}: {$path}");
        }
    }
}
