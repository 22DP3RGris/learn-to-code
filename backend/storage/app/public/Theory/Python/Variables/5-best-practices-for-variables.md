# Best Practices for Variables

Good naming and habits make code:
✅ Readable  
✅ Maintainable  

**Tips:**  
- Use meaningful names (`total_price`, not `tp`)  
- Avoid repeating code — use variables  
- Use constants logically  
- Avoid global variables when possible

**PEP8 styling guide (Python):**  
- Snake case (`user_email`)  
- Avoid overly short names (`x`, `y`) without context  
- Structure code with spacing and line breaks

**Code example:**

```python
# Not good:
p = 3.14
a = 5
c = p * a * a

# Better:
PI = 3.14
radius = 5
circle_area = PI * radius * radius
```

**Why is this important?**  
Clear, structured code is understandable even after months — not just by you, but also by others.
