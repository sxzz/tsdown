# docs:generate

function safe_sed() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "$@"
  else
    sed -i "$@"
  fi
}

echo "📚 Generating reference..."

# Generate API documentation
./node_modules/.bin/typedoc --tsconfig tsconfig.json >/dev/null 2>&1

echo "✅ Reference generated successfully!"

echo "📚 Beautifying reference structure..."

# Move Options.md to ./docs/reference
mv ./docs/reference/api/interfaces/Options.md ./docs/reference/config-options.md

# Remove the type-aliases folder if it exists
if [ -d "./docs/reference/type-aliases" ]; then
  rm -rf ./docs/reference/type-aliases
fi
# Create the type-aliases folder
mkdir -p ./docs/reference/type-aliases
# Move types-aliases/Sourcemap.md to ./docs/reference/type-aliases
mv ./docs/reference/api/type-aliases/Sourcemap.md ./docs/reference/type-aliases/Sourcemap.md

# Remove the api folder
rm -rf ./docs/reference/api

# In config-options.md, remove 6 first lines
safe_sed '1,6d' ./docs/reference/config-options.md
# In config-options.md, replace "../type-aliases" with "./type-aliases"
safe_sed 's/..\/type-aliases/.\/type-aliases/g' ./docs/reference/config-options.md

# In type-aliases files, remove 6 first lines
safe_sed '1,6d' ./docs/reference/type-aliases/*.md

echo "✅ Reference structure beautified successfully!"
