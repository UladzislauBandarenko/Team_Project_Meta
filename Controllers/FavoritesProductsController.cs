using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.Models;

namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritesProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public FavoritesProductsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FavoritesProduct>>> GetFavorites() =>
            await _context.FavoritesProducts.Include(fp => fp.User).Include(fp => fp.Product).ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<FavoritesProduct>> GetFavorite(int id)
        {
            var fav = await _context.FavoritesProducts.Include(fp => fp.User).Include(fp => fp.Product).FirstOrDefaultAsync(fp => fp.Id == id);
            if (fav == null) return NotFound();
            return fav;
        }

        [HttpPost]
        public async Task<ActionResult<FavoritesProduct>> AddFavorite(FavoritesProduct fav)
        {
            _context.FavoritesProducts.Add(fav);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetFavorite), new { id = fav.Id }, fav);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavorite(int id)
        {
            var fav = await _context.FavoritesProducts.FindAsync(id);
            if (fav == null) return NotFound();
            _context.FavoritesProducts.Remove(fav);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
