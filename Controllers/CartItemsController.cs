using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Team_Project_Meta.Data;
using Team_Project_Meta.Models;

namespace Team_Project_Meta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartItemsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CartItemsController(AppDbContext context) => _context = context;

        // Получить все элементы корзины
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems() =>
            await _context.CartItems.Include(ci => ci.Cart).Include(ci => ci.Product).ToListAsync();

        // Получить элемент корзины по Id
        [HttpGet("{id}")]
        public async Task<ActionResult<CartItem>> GetCartItem(int id)
        {
            var item = await _context.CartItems.Include(ci => ci.Cart).Include(ci => ci.Product).FirstOrDefaultAsync(ci => ci.Id == id);
            if (item == null) return NotFound();
            return item;
        }

        // Получить все товары из корзины по CartId (например, для отображения корзины пользователя)
        [HttpGet("cart/{cartId}")]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetItemsByCartId(int cartId)
        {
            var items = await _context.CartItems
                .Include(ci => ci.Product)
                .Where(ci => ci.CartId == cartId)
                .ToListAsync();

            return items;
        }

        // Добавить товар в корзину (если уже есть — увеличиваем количество)
        [HttpPost]
        public async Task<ActionResult<CartItem>> AddCartItem(CartItem cartItem)
        {
            var existingItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.CartId == cartItem.CartId && ci.ProductId == cartItem.ProductId);

            if (existingItem != null)
            {
                existingItem.Quantity += cartItem.Quantity;
            }
            else
            {
                _context.CartItems.Add(cartItem);
            }

            await _context.SaveChangesAsync();
            return Ok(cartItem);
        }

        // Обновить элемент корзины
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCartItem(int id, CartItem cartItem)
        {
            if (id != cartItem.Id) return BadRequest();
            _context.Entry(cartItem).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.CartItems.Any(ci => ci.Id == id)) return NotFound();
                else throw;
            }
            return NoContent();
        }

        // Удалить элемент корзины
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);
            if (cartItem == null) return NotFound();
            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
