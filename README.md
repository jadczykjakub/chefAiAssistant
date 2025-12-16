# Chef assistant

## Description

An intelligent cooking and event-planning assistant that guides you through organizing gatherings and produces well-structured notes along the way.

## How to set up

1. Clone repository
2. Install packages for editor intellisense

```bash
    npm i
```

3. Run to build container

```bash
    make build
```

4. Run to run development environment

```bash
    make up
```

## Useful

### For formatting use

```bash
    make format
```

### To check project for errors

```bash
    make lint
```

### How to test api

1. Generate venv

```bash
    python -m venv venv  # on Windows
    python3 -m venv venv # on Linux, Mac
```

2. Activate venv

```bash
    .\venv\Scripts\activate        # on Windows
    source ./venv/scripts/activate # on Linux, Mac
```

3. Run

```bash
    make test-api
```

> Warning: Make sure project is running, before running tests.
