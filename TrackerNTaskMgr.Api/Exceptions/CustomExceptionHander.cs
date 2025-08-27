using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace TrackerNTaskMgr.Api.Exceptions;

public class CustomExceptionHandler : IExceptionHandler
{
    private readonly IProblemDetailsService _problemDetailService;
    private readonly ILogger<CustomExceptionHandler> _logger;

    public CustomExceptionHandler(ILogger<CustomExceptionHandler> logger, IProblemDetailsService problemDetailService)
    {
        _logger = logger;
        _problemDetailService = problemDetailService;
    }

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        _logger.LogError(exception.Message);
        var (statusCode, problemDetails) = GetProblemDetailsAndStatusCode(exception);
        httpContext.Response.StatusCode = statusCode;
        return await _problemDetailService.TryWriteAsync(new ProblemDetailsContext
        {
            HttpContext = httpContext,
            ProblemDetails = problemDetails,
            Exception = exception
        });
    }

    private (int, ProblemDetails) GetProblemDetailsAndStatusCode(Exception exception)
    {
        return exception switch
        {
            BadRequestException => (
                StatusCodes.Status400BadRequest,
                new ProblemDetails
                {
                    Status = StatusCodes.Status400BadRequest,
                    Title = "Bad Request",
                    Detail = exception.Message,
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1"
                }
            ),
            DuplicateRecordException => (
                StatusCodes.Status400BadRequest,
                new ProblemDetails
                {
                    Status = StatusCodes.Status400BadRequest,
                    Title = "Duplicate Record",
                    Detail = exception.Message,
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1"
                }
            ),
            NotFoundException => (
            StatusCodes.Status404NotFound,
            new ProblemDetails
            {
                Status = StatusCodes.Status404NotFound,
                Title = "Resource not found",
                Detail = exception.Message,
                Type = "https://tools.ietf.org/html/rfc7231#section-6.5.4"
            }
        ),
            UnAuthorizedUserException => (
               StatusCodes.Status401Unauthorized,
               new ProblemDetails
               {
                   Status = StatusCodes.Status401Unauthorized,
                   Title = "Unauthorized access",
                   Detail = exception.Message,
                   Type = "Authorized access exception"
               }
           ),
            _ => (
                StatusCodes.Status500InternalServerError,
                new ProblemDetails
                {
                    Status = StatusCodes.Status500InternalServerError,
                    Title = "Server error",
                    Detail = exception.Message,
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1"
                }
           ),
        };
    }
}

