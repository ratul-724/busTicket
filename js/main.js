// Select seat and change color when clicked
const seats = document.querySelectorAll('.seat');
seats.forEach(seat => {
    seat.addEventListener('click', function() {
        if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            removeSelectedSeatDetails(seat.innerText);
        } else {
            seat.classList.add('selected');
            addSelectedSeatDetails(seat.innerText);
        }
        updateSelectedCount();
        seatLeft();
        total();
        cupon();
    });
});

// Count how many seats are selected and display their IDs
function updateSelectedCount() {
    const selectedSeatCount = document.getElementById('selectedSeatCount');
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedCount = selectedSeats.length;
    selectedSeatCount.innerText = selectedCount;
}

// Count how many seats are left when one is selected
function seatLeft(){
    const seatLeft = document.getElementById('seatLeft');
    const totalSeats = document.querySelectorAll('.seat').length;
    const selectedCount = document.querySelectorAll('.seat.selected').length;
    const seatsLeft = totalSeats - selectedCount;
    seatLeft.innerText = seatsLeft;
}

// Add selected seat details to the list
function addSelectedSeatDetails(seatId) {
    const selectedSeatDetailsContainer = document.querySelector('.tbody');

    // Create the new seat details div
    const seatDetailsDiv = document.createElement('div');
    seatDetailsDiv.classList.add('selectedSeatDetils');
    seatDetailsDiv.setAttribute('data-seat-id', seatId);

    // Create the inner HTML for the seat details
    seatDetailsDiv.innerHTML = `
        <p class="seatNumber"><span id="selectedSeatText">${seatId}</span></p>
        <p class="seatClass">AC Business</p>
        <p>BDT <span id="singleTicketPrice" class="perSeatPrice">550</span></p>
    `;

    // Append the new seat details div to the container
    selectedSeatDetailsContainer.appendChild(seatDetailsDiv);
}

// Remove selected seat details from the list
function removeSelectedSeatDetails(seatId) {
    const selectedSeatDetailsContainer = document.querySelector('.tbody');
    const seatDetailsDiv = selectedSeatDetailsContainer.querySelector(`[data-seat-id="${seatId}"]`);
    if (seatDetailsDiv) {
        selectedSeatDetailsContainer.removeChild(seatDetailsDiv);
    }
}

// total price
function total(){
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedCount = selectedSeats.length;
    const total = selectedCount * 550;
    const totalPrice = document.getElementById('totalPrice');
    totalPrice.innerText = total;
    const grandTotalPrice = document.getElementById('grandTotalPrice');
    grandTotalPrice.innerText = total ;
    // const vat = total * 0.1;
    // const vatPrice = document.getElementById('vatPrice');
    // vatPrice.innerText = vat;
};

// code for cupon apply
let couponApplied = false;

function cupon(){
    const applyCuponButton = document.getElementById('applyCupon');
    applyCuponButton.addEventListener('click', function(){
        if (!couponApplied) {
            const cupon = document.getElementById('cupon').value;
            const grandTotalPrice = document.getElementById('grandTotalPrice');

            if(cupon === 'new15' || cupon === 'NEW15'){
                const currentTotal = parseFloat(grandTotalPrice.innerText);
                const discountedTotal = currentTotal - (currentTotal * 0.15);
                grandTotalPrice.innerText = discountedTotal.toFixed(2); // Display with 2 decimal places
                couponApplied = true; // Set the flag to true to prevent reapplying the coupon
            }else if(cupon === 'couple20' || cupon === 'COUPLE20'){
                const currentTotal = parseFloat(grandTotalPrice.innerText);
                const discountedTotal = currentTotal - (currentTotal * 0.20);
                grandTotalPrice.innerText = discountedTotal.toFixed(2); // Display with 2 decimal places
                couponApplied = true; // Set the flag to true to prevent reapplying the coupon
            } else {
                alert('Invalid coupon code.');
                return;
            }
        } else {
            alert('Coupon has already been applied.');
        }
    });
}

// User details
function userDetails(){
    const nextBtn = document.getElementById("purchaseTicket");
    nextBtn.addEventListener("click", function(){

        // popUp for user Details start
            document.getElementById("popUp").classList.add("openPopUp");
            let okBtn = document.getElementById("okBtn")
            okBtn.addEventListener('click', function(){
                document.getElementById("popUp").classList.remove("openPopUp");
            });
        // popUp for user Details end

        const userName = document.getElementById("userName").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const emailAddress = document.getElementById("emailAddress").value;

        const popUpUserName = document.getElementById("popUpUserName");
        popUpUserName.innerText = userName;

        const checkEmil = document.getElementById("checkEmil");
        checkEmil.innerText = emailAddress;

        const checkPhone = document.getElementById("checkPhone");
        checkPhone.innerText = phoneNumber;


        const seatNumbers = document.querySelectorAll(".seatNumber");
        const seatNumberValues = Array.from(seatNumbers).map(seat => seat.innerText);

        document.getElementById("popUpSeatNumber").innerText = seatNumberValues;

        // const seatClasses = document.querySelectorAll(".seatClass");
        // const seatClassValues = Array.from(seatClasses).map(seatClass => seatClass.innerText);

        document.getElementById("popUpClassName").innerText = "Ac Business";

        const perSeatPrices = document.querySelectorAll(".perSeatPrice");
        const perSeatPriceValues = Array.from(perSeatPrices).map(perSeatPrice => perSeatPrice.innerText);

        const perSeatPriceIntValue = parseInt(perSeatPriceValues)
        document.getElementById("popUpTotal").innerText = perSeatPriceIntValue * seatNumbers.length;  
    });    
}
userDetails();
