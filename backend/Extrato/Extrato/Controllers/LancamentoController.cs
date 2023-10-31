using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Extrato.Models;
using Microsoft.AspNetCore.Cors;

namespace Extrato.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LancamentoController : ControllerBase
    {
        private readonly LancamentoContext _context;

        public LancamentoController(LancamentoContext context)
        {
            _context = context;
        }

        // GET: api/Lancamento
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lancamento>>> GetLancamentos()
        {
          if (_context.Lancamentos == null)
          {
              return NotFound();
          }
            return await _context.Lancamentos.ToListAsync();
        }

        // GET: api/Lancamento/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lancamento>> GetLancamento(long id)
        {
          if (_context.Lancamentos == null)
          {
              return NotFound();
          }
            var lancamento = await _context.Lancamentos.FindAsync(id);

            if (lancamento == null)
            {
                return NotFound();
            }

            return lancamento;
        }

        // PUT: api/Lancamento/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLancamento(long id, Lancamento lancamento)
        {
            if (id != lancamento.Id)
            {
                return BadRequest();
            }

            var l = await _context.Lancamentos.FindAsync(id);
            if (l == null)
            {
                return NotFound();
            }

            if ( !l.Avulso )
            {
                return Problem("Não é possível alterar lancamentos avulsos");
            }

                l.Data = lancamento.Data;
                l.Status = lancamento.Status;
                l.Valor = lancamento.Valor;

            _context.Entry(l).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LancamentoExists(id))
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

        // POST: api/Lancamento
        [HttpPost]
        public async Task<ActionResult<Lancamento>> PostLancamento(Lancamento lancamento)
        {
          if (_context.Lancamentos == null)
          {
              return Problem("Entity set 'LancamentoContext.Lancamentos'  is null.");
          }

            lancamento.Id = _context.Lancamentos.Any() ? _context.Lancamentos.Max(item => item.Id)+1 : 0;
            lancamento.Data = DateTime.Now;
            lancamento.Avulso = true;
            lancamento.Status = true;
            _context.Lancamentos.Add(lancamento);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLancamento), new { id = lancamento.Id }, lancamento);
        }

        // POST: api/Lancamento/nao-avulso
        [HttpPost("nao-avulso")]
        public async Task<ActionResult<Lancamento>> PostLancamentoNaoAvulso(Lancamento lancamento)
        {
            if (_context.Lancamentos == null)
            {
                return Problem("Entity set 'LancamentoContext.Lancamentos'  is null.");
            }
            lancamento.Id = _context.Lancamentos.Any() ? _context.Lancamentos.Max(item => item.Id) + 1 : 0;
            lancamento.Avulso = false;
            lancamento.Status = true;
            _context.Lancamentos.Add(lancamento);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLancamento), new { id = lancamento.Id }, lancamento);
        }

        private bool LancamentoExists(long id)
        {
            return (_context.Lancamentos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
