all:
	@echo "test_mac       Prueba la aplicacion usando nodewebkit en mac osx."

test_mac:
	@echo "Cuidado - se está usando la version de nodewebkit del sistema."
	open -a /Applications/node-webkit.app src