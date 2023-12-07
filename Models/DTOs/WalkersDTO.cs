namespace DogWalkingCS.Models.DTOs;

public class WalkerDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public int CityId { get; set; }
    public CityDTO City { get; set; }
}
