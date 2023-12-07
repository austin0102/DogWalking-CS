namespace DogWalkingCS.Models.DTOs;

public class PetDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int WalkerId { get; set; }
    public WalkerDTO Walker { get; set; }
}