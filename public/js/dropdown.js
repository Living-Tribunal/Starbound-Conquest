document.addEventListener('DOMContentLoaded', () => {
    const shipFaction = document.getElementById('ship-faction');
    const shipFactionOptions = [...shipFaction.children];
    shipFaction.innerHTML = '<option value="" disabled selected>---Select---</option>';
    document.getElementById('ship-class').addEventListener('change',(event) => {
        // Get the selected ship class values as an array

        const selectedValues = event.target.value.split(',');
        shipFaction.innerHTML = shipFactionOptions
             // Filter options based on the selected values
            .filter(option => selectedValues.includes(option.value))
             // Convert the filtered options back to HTML
            .map(option => option.outerHTML)
             // Join them into a single string
            .join('')
        })
    });