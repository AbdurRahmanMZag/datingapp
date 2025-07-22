using System;
using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string GetMemberId(this ClaimsPrincipal user)
    {
        var memberId = user.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Could not get memberId from token");

        return memberId;
    }
}
