from ortools.sat.python import cp_model

def schedule_tasks(tasks):
    model = cp_model.CpModel()
    task_vars = {}
    
    for task in tasks:
        task_vars[task['name']] = model.NewIntVar(0, 24, task['name'])
    
    # Add constraints (e.g., non-overlapping, deadlines, priority)
    for task in tasks:
        model.Add(task_vars[task['name']] + task['duration'] <= 24)
    
    solver = cp_model.CpSolver()
    status = solver.Solve(model)
    
    if status == cp_model.FEASIBLE:
        return {task: solver.Value(var) for task, var in task_vars.items()}
    else:
        return "No feasible schedule found"

tasks = [
    {'name': 'Study', 'duration': 2, 'priority': 'High'},
    {'name': 'Workout', 'duration': 1, 'priority': 'Medium'},
    {'name': 'Project Work', 'duration': 3, 'priority': 'High'}
]

print(schedule_tasks(tasks))
