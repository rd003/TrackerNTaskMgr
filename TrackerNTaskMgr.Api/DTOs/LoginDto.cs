using System.ComponentModel.DataAnnotations;

namespace TrackerNTaskMgr.Api.DTOs;

public record LoginDto(string? Username, string? Password);