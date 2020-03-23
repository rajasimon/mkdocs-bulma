from setuptools import setup, find_packages

VERSION = "0.0.5"


setup(
    name="mkdocs-bulma",
    version=VERSION,
    url="https://github.com/rajasimon/mkdocs-bulma",
    license="MIT",
    description="Bulma for mkdocs",
    author="Raja Simon",
    author_email="rajasimon@icloud.com",
    packages=find_packages(),
    include_package_data=True,
    entry_points={"mkdocs.themes": ["bulma = bulma",]},
    zip_safe=False,
)
