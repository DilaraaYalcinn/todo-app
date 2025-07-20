using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TodoContext _context;

    public TasksController(TodoContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoTask>>> GetTasks()
    {
        return await _context.Tasks.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<TodoTask>> CreateTask(TodoTask task)
    {
        if (task.Description.Length <= 10)
            return BadRequest("Task description must be longer than 10 characters.");

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, TodoTask updatedTask)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();

        task.Description = updatedTask.Description;
        task.Deadline = updatedTask.Deadline;
        task.IsCompleted = updatedTask.IsCompleted;

        await _context.SaveChangesAsync();
        return NoContent();
    }
    
    [HttpPatch("{id}")]
    public async Task<IActionResult> MarkAsDone(int id, [FromBody] JsonElement patch)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();

        if (patch.TryGetProperty("isCompleted", out var isCompletedProp))
        {
            task.IsCompleted = isCompletedProp.GetBoolean();
        }

        await _context.SaveChangesAsync();
        return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
