# Type Conversion

Sometimes, you need to convert one data type to another.

**Functions:**  
- `int()` – convert to integer  
- `float()` – convert to float  
- `str()` – convert to string  
- `bool()` – convert to boolean

**Examples:**

```python
a = "123"
b = int(a)  # now b is 123 as int

x = 9.81
y = str(x)  # now y is "9.81" as str
```

**Be careful:**

```python
int("abc")  # Will raise an error: ValueError
```

**Practical example:**

```python
age_input = input("Enter your age: ")
age = int(age_input)
```

**Why is this important?**  
User input usually comes as text — you must convert it to use it in calculations.
