using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.Models;

namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CartsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts() =>
            await _context.Carts.Include(c => c.User).ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _context.Carts.Include(c => c.User).FirstOrDefaultAsync(c => c.Id == id);
            if (cart == null) return NotFound();
            return cart;
        }

        [HttpPost]
        public async Task<ActionResult<Cart>> AddCart(Cart cart)
        {
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCart), new { id = cart.Id }, cart);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCart(int id, Cart cart)
        {
            if (id != cart.Id) return BadRequest();
            _context.Entry(cart).State = EntityState.Modified;
            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Carts.Any(c => c.Id == id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null) return NotFound();
            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
