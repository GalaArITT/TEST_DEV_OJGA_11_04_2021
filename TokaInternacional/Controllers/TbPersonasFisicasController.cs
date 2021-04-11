using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TokaInternacional.Models;

namespace TokaInternacional.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TbPersonasFisicasController : ControllerBase
    {
        private readonly TokaInternacionalContext _context;

        public TbPersonasFisicasController(TokaInternacionalContext context)
        {
            _context = context;
        }

        //// GET: api/TbPersonasFisicas
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<TbPersonasFisicas>>> GetTbPersonasFisicas()
        {
            return await _context.TbPersonasFisicas.ToListAsync();
        }

        // GET: api/TbPersonasFisicas/5
        [HttpGet("[action]/{id}")]
        public async Task<ActionResult<TbPersonasFisicas>> GetTbPersonasFisicas(int id)
        {
            var tbPersonasFisicas = await _context.TbPersonasFisicas.FindAsync(id);

            if (tbPersonasFisicas == null)
            {
                return NotFound();
            }

            return tbPersonasFisicas;
        }

        // PUT: api/TbPersonasFisicas/5
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> PutTbPersonasFisicas(int id, TbPersonasFisicas tbPersonasFisicas)
        {
            if (id != tbPersonasFisicas.IdPersonaFisica)
            {
                return BadRequest();
            }

            tbPersonasFisicas.FechaActualizacion = DateTime.Now;  
            _context.Entry(tbPersonasFisicas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbPersonasFisicasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TbPersonasFisicas
        [HttpPost("[action]")]
        public async Task<ActionResult<TbPersonasFisicas>> PostTbPersonasFisicas(TbPersonasFisicas tbPersonasFisicas)
        {
            tbPersonasFisicas.FechaRegistro = DateTime.Now;
            tbPersonasFisicas.Activo = true;
            tbPersonasFisicas.UsuarioAgrega = 1;
            _context.TbPersonasFisicas.Add(tbPersonasFisicas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTbPersonasFisicas", new { id = tbPersonasFisicas.IdPersonaFisica }, tbPersonasFisicas);
        }

        // DELETE: api/TbPersonasFisicas/5
        [HttpDelete("[action]/{id}")]
        public async Task<ActionResult<TbPersonasFisicas>> DeleteTbPersonasFisicas(int id)
        {
            var tbPersonasFisicas = await _context.TbPersonasFisicas.FindAsync(id);
            if (tbPersonasFisicas == null)
            {
                return NotFound();
            }

            _context.TbPersonasFisicas.Remove(tbPersonasFisicas);
            await _context.SaveChangesAsync();

            return tbPersonasFisicas;
        }

        private bool TbPersonasFisicasExists(int id)
        {
            return _context.TbPersonasFisicas.Any(e => e.IdPersonaFisica == id);
        }
    }
}
