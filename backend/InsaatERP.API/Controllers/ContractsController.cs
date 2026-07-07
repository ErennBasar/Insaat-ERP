using InsaatERP.Application.Features.Contracts.Commands.CreateContract;
using InsaatERP.Application.Features.Contracts.Queries.GetAllContracts;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InsaatERP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ContractsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateContractCommand command)
        {
            var contractId = await _mediator.Send(command);

            return Ok(contractId);
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var query = new GetAllContractsQuery();
            var contracts = await _mediator.Send(query);
            return Ok(contracts);
        }
    }
}
