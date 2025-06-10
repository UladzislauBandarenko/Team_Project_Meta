using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.Models;

namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeliveryServicesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DeliveryServicesController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryService>>> GetDeliveryServices() =>
            await _context.DeliveryServices.ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryService>> GetDeliveryService(int id)
        {
            var ds = await _context.DeliveryServices.FindAsync(id);
            if (ds == null) return NotFound();
            return ds;
        }

        [HttpPost]
        public async Task<ActionResult<DeliveryService>> AddDeliveryService(DeliveryService ds)
        {
            _context.DeliveryServices.Add(ds);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDeliveryService), new { id = ds.Id }, ds);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDeliveryService(int id, DeliveryService ds)
        {
            if (id != ds.Id) return BadRequest();
            _context.Entry(ds).State = EntityState.Modified;
            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.DeliveryServices.Any(d => d.Id == id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeliveryService(int id)
        {
            var ds = await _context.DeliveryServices.FindAsync(id);
            if (ds == null) return NotFound();
            _context.DeliveryServices.Remove(ds);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
