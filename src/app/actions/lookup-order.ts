'use server'

export async function lookupOrder(formData: FormData) {
    const orderNumber = formData.get("orderNumber") as string;
    const email = formData.get("email") as string;

    if (!orderNumber || !email) {
        return { error: "Order number and email are required." };
    }

    console.log("Mocking lookup for Order:", orderNumber, "Email:", email);

    // Demo Triggers based on Order Number

    // Scenario 1: Mattress Return (Normal Flow)
    if (orderNumber === "100") {
        return {
            success: true,
            order: {
                id: 100,
                number: "SN-100",
                status: "completed",
                currency: "CAD",
                date_created: "2024-01-10T10:00:00Z",
                billing: { first_name: "John", last_name: "Doe", email },
                line_items: [
                    { id: 1, name: "Organic Mattress", sku: "MAT-ORG-Q", quantity: 1, price: "1200", image: { src: "https://placehold.co/100x100?text=Mattress" } }
                ]
            },
            error: null
        };
    }

    // Scenario 2: Furniture Warranty (Requires CX Review)
    if (orderNumber === "200") {
        return {
            success: true,
            order: {
                id: 200,
                number: "SN-200",
                status: "completed",
                currency: "CAD",
                date_created: "2023-12-01T10:00:00Z",
                billing: { first_name: "Jane", last_name: "Smith", email },
                line_items: [
                    { id: 3, name: "Dresser (5-Drawer)", sku: "FURN-DRS", quantity: 1, price: "850", image: { src: "https://placehold.co/100x100?text=Dresser" } }
                ]
            },
            error: null
        };
    }

    // Scenario 3: Final Sale Block
    if (orderNumber === "300") {
        return {
            success: true,
            order: {
                id: 300,
                number: "SN-300",
                status: "completed",
                currency: "CAD",
                date_created: "2024-01-15T10:00:00Z",
                billing: { first_name: "Bob", last_name: "Black", email },
                line_items: [
                    { id: 4, name: "Clearance Sheet Set (Final Sale)", sku: "ACC-SHT-CLR", quantity: 1, price: "50", image: { src: "https://placehold.co/100x100?text=Sheets" } }
                ]
            },
            error: null
        };
    }

    // Scenario 4: Bundle Return (Warning Display)
    if (orderNumber === "400") {
        return {
            success: true,
            order: {
                id: 400,
                number: "SN-400",
                status: "completed",
                currency: "CAD",
                date_created: "2024-01-18T10:00:00Z",
                billing: { first_name: "Alice", last_name: "White", email },
                line_items: [
                    { id: 5, name: "Sleep Bundle (Mattress + Pillow)", sku: "BND-SLP", quantity: 1, price: "1350", image: { src: "https://placehold.co/100x100?text=Bundle" } },
                    { id: 6, name: "Extra Pillow", sku: "ACC-PLW", quantity: 1, price: "0", image: { src: "https://placehold.co/100x100?text=Free+Pillow" } }
                ]
            },
            error: null
        };
    }

    // Default Fallback
    return {
        success: true,
        order: {
            id: 999,
            number: "SN-DEFAULT",
            status: "completed",
            currency: "CAD",
            date_created: new Date().toISOString(),
            billing: { first_name: "Mock", last_name: "User", email },
            line_items: [
                { id: 1, name: "Default Mock Item", sku: "MOCK-1", quantity: 1, price: "100", image: { src: "https://placehold.co/100x100?text=Item" } }
            ]
        },
        error: null
    };
}
