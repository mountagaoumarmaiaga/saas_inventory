import SupplierFormPage from "./form";
import { usePage } from "@inertiajs/react";

export default function EditSupplier() {
    const { id } = usePage<{ id: number }>().props;
    return <SupplierFormPage id={id} />;
}
