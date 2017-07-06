def logged(prefix):
	def decorator(f):
		def decorated_f(*args, **kwargs):
			print(prefix, f.__name__, "just called with", args, kwargs)
			return f(*args, **kwargs)
 
		decorated_f.__name__ = f.__name__
		return decorated_f
	return decorator
 
@logged("some_prefix")
def add(a, b):
	return a + b
 
print(add(2, 3))