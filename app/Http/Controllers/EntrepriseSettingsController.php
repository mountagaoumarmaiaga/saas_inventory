<?php

namespace App\Http\Controllers;

use App\Models\Entreprise;
use App\Services\ImageService;
use Illuminate\Http\Request;

class EntrepriseSettingsController extends Controller
{
    public function __construct(
        private ImageService $imageService
    ) {}

    public function show(Request $request)
    {
        $entreprise = Entreprise::findOrFail($request->user()->entreprise_id);
        
        return response()->json(['data' => $entreprise]);
    }

    public function update(Request $request)
    {
        $entreprise = Entreprise::findOrFail($request->user()->entreprise_id);
        
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:entreprises,email,' . $entreprise->id,
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'invoice_header' => 'nullable|string',
            'invoice_footer' => 'nullable|string',
            'invoice_template' => 'sometimes|in:classic,modern,professional,executive,creative,elegant,industrial,minimalist,retail,bold',
            'delivery_note_template' => 'sometimes|in:classic,modern,minimalist',
            'currency' => 'sometimes|string|max:10',
            'currency_symbol' => 'sometimes|string|max:10',
            'currency_position' => 'sometimes|in:left,right',
            'qr_payment_link' => 'nullable|string|url'
        ]);

        $entreprise->update($data);

        return response()->json(['data' => $entreprise]);
    }

    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $entreprise = Entreprise::findOrFail($request->user()->entreprise_id);

        // Delete old logo if exists
        if ($entreprise->logo_url) {
            $this->imageService->deleteIfExists($entreprise->logo_url);
        }

        // Upload new logo to Supabase
        $file = $request->file('logo');
        $path = "logos/{$entreprise->id}/" . time() . '_' . $file->getClientOriginalName();
        $url = $this->imageService->storeLogo($file, $path);

        $entreprise->update(['logo_url' => $url]);

        return response()->json(['data' => $entreprise]);
    }
}
