public class Reservation
{
    public int Id { get; set; }
    public string CustomerName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime ReservationDate { get; set; }
    public int NumberOfPeople { get; set; }
    public string SpecialRequests { get; set; }
}
