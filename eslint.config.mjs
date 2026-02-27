import odgConfig from "@odg/eslint-config";

export default [
    ...odgConfig,
    {
        "rules": {
            "security/detect-non-literal-fs-filename": "off",
        },
    },
];
