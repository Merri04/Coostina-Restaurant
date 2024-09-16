using Injera.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace YourApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly RestaurantContext _restaurantContext; // Inject the DbContext for your SQLite database

        public ReservationController(RestaurantContext restaurantContext)
        {
            _restaurantContext = restaurantContext;
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservation([FromBody] Reservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid reservation details.");
            }

            // Assign the current date for creation
            reservation.ReservationDate = DateTime.Now;

            // Save reservation to the database
            _restaurantContext.Reservations.Add(reservation);
            await _restaurantContext.SaveChangesAsync();

            // (Optional) Send confirmation email or notify restaurant via email
            // await SendReservationNotificationEmail(reservation);

            return Ok(new { message = "Reservation created successfully!" });
        }
    }
}
