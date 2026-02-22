<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Repositories\Contracts\ClientRepositoryInterface;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function __construct(private ClientRepositoryInterface $clients) {}

    public function index(Request $request)
    {
        $this->authorize('viewAny', Client::class);
        $eid = $request->user()->entreprise_id;

        $data = $this->clients->paginateByEntreprise($eid, $request->all(), (int)$request->get('perPage', 10));
        return response()->json($data);
    }

    public function show(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $client = $this->clients->findForEntreprise($eid, $id);
        $this->authorize('view', $client);

        return response()->json(['data' => $client]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Client::class);
        $eid = $request->user()->entreprise_id;

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:255',
        ]);

        $data['created_by'] = $request->user()->id;
        $data['updated_by'] = null;

        $client = $this->clients->create($eid, $data);

        return response()->json(['data' => $client], 201);
    }

    public function update(Request $request, int $id)
    {
        $eid = $request->user()->entreprise_id;
        $client = $this->clients->findForEntreprise($eid, $id);
        $this->authorize('update', $client);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:255',
        ]);

        $data['updated_by'] = $request->user()->id;

        $client = $this->clients->update($client, $data);

        return response()->json(['data' => $client]);
    }

    public function destroy(Request $request, int $id)
    {
       $eid = $request->user()->entreprise_id;

        $client = $this->clients->findForEntreprise($eid, $id);
        $this->authorize('delete', $client);

        $this->clients->delete($client);

        return response()->json(['message' => 'Client supprimé.']);
    }
}
