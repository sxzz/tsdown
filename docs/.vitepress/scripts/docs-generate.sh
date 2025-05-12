#!/bin/bash

safe_sed() {
  if [ "$(uname)" = "Darwin" ]; then
    sed -i '' "$@"
  else
    sed -i "$@"
  fi
}

echo "📚 Generating reference..."

# Generate API documentation
./node_modules/.bin/typedoc --tsconfig tsconfig.json

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
# Move types-aliases/{Sourcemap,Format}.md to ./docs/reference/type-aliases
mv ./docs/reference/api/type-aliases/{Sourcemap,Format,ModuleTypes}.md ./docs/reference/type-aliases

# Remove the api folder
rm -rf ./docs/reference/api

# In config-options.md, remove 6 first lines
safe_sed '1,6d' ./docs/reference/config-options.md
# In config-options.md, replace "../type-aliases" with "./type-aliases"
safe_sed 's/..\/type-aliases/.\/type-aliases/g' ./docs/reference/config-options.md

# In type-aliases files, remove 6 first lines
safe_sed '1,6d' ./docs/reference/type-aliases/*.md

# Initialize an array of all locales
locales=("zh-CN")
# Copy the config-options.md file and the type-aliases folder to each locale
for locale in "${locales[@]}"; do
  # Copy config-options.md to the locale directory
  cp ./docs/reference/config-options.md "./docs/$locale/reference/config-options.md"
  # Remove the type-aliases folder if it exists in the locale directory
  if [ -d "./docs/$locale/reference/type-aliases" ]; then
    rm -rf "./docs/$locale/reference/type-aliases"
  fi
  # Copy the type-aliases folder to the locale directory
  cp -r ./docs/reference/type-aliases "./docs/$locale/reference"
done

echo "✅ Reference structure beautified successfully!"
