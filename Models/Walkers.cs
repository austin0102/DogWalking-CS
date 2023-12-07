namespace DogWalkingCS.Models;

public class Walker
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public int CityId { get; set; }
    public City City { get; set; }
}