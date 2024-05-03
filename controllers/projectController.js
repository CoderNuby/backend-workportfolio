const response = require("express").response;
const path = require("path");
const Project = require("../models/project");
const fs = require("fs");


const projectController = {
    helloWorld(req, res = response) {
        return res.status(200).json({
            ok: true,
            message: "Hello world from project controller"
        });
    },
    async createProject(req, res = response){
        try {
            const { name, description, category, year, langs, image } = req.body;

            const project = new Project({
                name,
                description,
                category,
                year,
                langs,
                image
            });

            await project.save();

            return res.status(200).json({
                ok: true,
                data: project
            });
        } catch (error) {
            console.error(error);
        }
    },
    async get(req, res = response) {
        const { id } = req.params;
    
        try {
            const project = await Project.findById(id);
    
            if (!project) {
                return res.status(404).json({
                    ok: false,
                    message: "Project not found"
                });
            }
    
            return res.status(200).json({
                ok: true,
                data: project
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error: "Internal server error"
            });
        }
    },
    async getAll(req, res = response) {
    
        try {
            const projects = await Project.find({});
    
            if (!projects) {
                return res.status(404).json({
                    ok: false,
                    message: "There is not project in the database"
                });
            }
    
            return res.status(200).json({
                ok: true,
                data: projects
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error: "Internal server error"
            });
        }
    },
    async update(req, res = response) {
        const { id } = req.params;
        const projectBody = req.body;

        try {
            const project = await Project.findById(id);
    
            if (!project) {
                return res.status(404).json({
                    ok: false,
                    message: "Project not found"
                });
            }

            let projectUpdated  = await Project.findByIdAndUpdate(id, projectBody, { new: true });

            return res.status(200).json({
                ok: true,
                data: projectUpdated
            });
            
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error: "Internal server error"
            });
        }
    },
    async delete(req, res = response){
        const { id } = req.params;

        try {
            const project = await Project.findById(id);
    
            if (!project) {
                return res.status(404).json({
                    ok: false,
                    message: "Project not found"
                });
            }

            await Project.deleteOne({ _id: id });

            return res.status(200).json({
                ok: true,
                data: "Project delted successfuly"
            });
            
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error: "Internal server error"
            });
        }
    },
    async uploadImage(req, res = response){
        let { id } = req.params;

        let fileName = "";

        try {
            const project = await Project.findById(id);
    
            if (!project) {
                return res.status(404).json({
                    ok: false,
                    message: "Project not found"
                });
            }

            if(req.files){
                let filePath = req.files.image.path;
                let fileName = filePath.split("\\")[1];
                let imageExtention = fileName.split(".")[1];
    
                switch (imageExtention) {
                    case "png":
                    case "jpg":
                    case "jpeg":
                    case "gif":
                        let projectUpdated = await Project.findByIdAndUpdate(id, { image: fileName }, { new: true });
            
                        return res.status(200).json({
                            ok: true,
                            data: projectUpdated
                        });
                
                    default:
                        fs.unlink(filePath, () => {
                            return res.status(400).json({
                                ok: false,
                                project: "The extention of the file is not awolled"
                            });
                        });
                }
            }else{
                return res.status(400).json({
                    ok: false,
                    message: "There is not files"
                });
            }
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error: "Internal server error"
            });
        }
    },
    async getImageFile(req, res){
        let file = req.params.image;
        let pathFile = `./uploads/${file}`;
    
        if (fs.existsSync(pathFile)) {
            return res.sendFile(path.resolve(pathFile));
        } else {
            return res.status(404).json({
                ok: false,
                data: "Image not found"
            });
        }
    }
}

module.exports = projectController;