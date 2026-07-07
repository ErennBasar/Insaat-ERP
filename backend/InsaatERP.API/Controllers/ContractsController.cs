using InsaatERP.Application.Features.Contracts.Commands.CreateContract;
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
    }
}
