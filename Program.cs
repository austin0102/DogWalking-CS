using DogWalkingCS.Models;
using DogWalkingCS.Models.DTOs;

var builder = WebApplication.CreateBuilder(args);


List<City> cities = new List<City>
{
    new City { Id = 1, Name = "Chicago" },
    new City { Id = 2, Name = "White Plains" },
    new City { Id = 3, Name = "Sarasota" },
    new City { Id = 4, Name = "San Diego" },
    new City { Id = 5, Name = "Boise" },
    new City { Id = 6, Name = "Denver" },
    new City { Id = 7, Name = "Tuscan" },
    new City { Id = 8, Name = "Pheonix" },
    new City { Id = 9, Name = "Minneapolis" },
    new City { Id = 10, Name = "Pittsburgh" }
};

List<Walker> walkers = new List<Walker>
{
    new Walker { Id = 1, Name = "Alphonse Meron", Email = "ameron0@mashable.com", CityId = 1 },
    new Walker { Id = 2, Name = "Damara Pentecust", Email = "dpentecust1@apache.org", CityId = 2 },
    new Walker { Id = 3, Name = "Anna Bowton", Email = "abowton2@wisc.edu", CityId = 3 },
    new Walker { Id = 4, Name = "Hunfredo Drynan", Email = "hdrynan3@bizjournals.com", CityId = 4 },
    new Walker { Id = 5, Name = "Elmira Bick", Email = "ebick4@biblegateway.com", CityId = 5 },
    new Walker { Id = 6, Name = "Bernie Dreger", Email = "bdreger5@zimbio.com", CityId = 6 },
    new Walker { Id = 7, Name = "Rolando Gault", Email = "rgault6@google.com", CityId = 7 },
    new Walker { Id = 8, Name = "Tiffanie Tubby", Email = "ttubby7@intel.com", CityId = 8 },
    new Walker { Id = 9, Name = "Tomlin Cutill", Email = "tcutill8@marketwatch.com", CityId = 9 },
    new Walker { Id = 10, Name = "Arv Biddle", Email = "abiddle9@cafepress.com", CityId = 10 },
    new Walker { Id = 11, Name = "Amelia Anderson", Email = "amelia@andersonfam.com", CityId = 4 }
};

List<Pet> pets = new List<Pet>
{
    new Pet { Id = 1, Name = "Dianemarie Hartness", WalkerId = 3 },
    new Pet { Id = 2, Name = "Christoph Fosdyke", WalkerId = 10 },
    new Pet { Id = 3, Name = "Rocket", WalkerId = 7 },
    new Pet { Id = 4, Name = "Ebony", WalkerId = 3 },
    new Pet { Id = 5, Name = "Scotty", WalkerId = 8 },
    new Pet { Id = 6, Name = "Mac", WalkerId = 2 },
    new Pet { Id = 7, Name = "Oreo", WalkerId = 5 },
    new Pet { Id = 8, Name = "Sassy", WalkerId = 1 },
    new Pet { Id = 9, Name = "Salem", WalkerId = 9 },
    new Pet { Id = 10, Name = "Panda", WalkerId = 7 }
};

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});
app.MapGet("/api/walkers", () =>
{
    List<WalkerDTO> walkerDTOs = walkers.Select(walker => new WalkerDTO
    {
        Id = walker.Id,
        Name = walker.Name,
        Email = walker.Email,
        CityId = walker.CityId, // Assuming your Walker class has a CityID property
        City = cities.FirstOrDefault(city => city.Id == walker.CityId) != null
            ? new CityDTO
            {
                Id = walker.CityId,
                Name = cities.First(city => city.Id == walker.CityId).Name
            }
            : null
    }).ToList();

    return walkerDTOs;
});


app.MapGet("/api/pets", () =>
{
    List<PetDTO> petDTOs = pets.Select(pet => new PetDTO
    {
        Id = pet.Id,
        Name = pet.Name,
        WalkerId = pet.WalkerId,
        Walker = walkers.FirstOrDefault(walker => walker.Id == pet.WalkerId) != null
            ? new WalkerDTO
            {
                Id = pet.WalkerId,
                Name = walkers.First(walker => walker.Id == pet.WalkerId).Name,
                Email = walkers.First(walker => walker.Id == pet.WalkerId).Email
                
                // Add other properties as needed
            }
            : null
    }).ToList();

    return petDTOs;
});


app.MapGet("/api/pets/{id}", (int id) =>
{
    Pet pet = pets.FirstOrDefault(p => p.Id == id);

    if (pet == null)
    {
        return Results.NotFound($"Pet with ID {id} not found");
    }

    Walker walker = walkers.FirstOrDefault(w => w.Id == pet.WalkerId);

    return Results.Ok(new PetDTO
    {
        Id = pet.Id,
        Name = pet.Name,
        WalkerId = pet.WalkerId,
        Walker = walker != null
            ? new WalkerDTO
            {
                Id = walker.Id,
                Name = walker.Name,
                Email = walker.Email
                // Add other properties as needed
            }
            : null
    });
});

app.Run();
